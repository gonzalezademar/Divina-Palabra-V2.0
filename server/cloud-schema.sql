-- Esquema del piloto. Las tablas y funciones son exclusivas del servidor.
-- Aplicar con una conexión administrativa; nunca desde el navegador.
begin;
create table if not exists public.dp_state (
  id text primary key,
  revision bigint not null default 0,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
create table if not exists public.dp_rate_limits (
  key_hash text primary key,
  attempts integer not null,
  expires_at timestamptz not null
);
alter table public.dp_state enable row level security;
alter table public.dp_rate_limits enable row level security;
revoke all on public.dp_state, public.dp_rate_limits from public, anon, authenticated;
grant select, insert, update, delete on public.dp_state, public.dp_rate_limits to service_role;

create or replace function public.dp_commit_state(p_id text, p_revision bigint, p_value jsonb)
returns boolean language plpgsql security invoker set search_path = '' as $$
begin
  if jsonb_typeof(p_value) <> 'object' then raise exception 'Invalid state'; end if;
  update public.dp_state set value = p_value, revision = revision + 1, updated_at = now()
    where id = p_id and revision = p_revision;
  return found;
end;
$$;

create or replace function public.dp_take_rate(p_key text, p_max integer, p_duration_ms integer)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare hits integer; stamp timestamptz := clock_timestamp();
begin
  if p_max < 1 or p_duration_ms < 1 or p_duration_ms > 3600000 or length(p_key) <> 64 then
    raise exception 'Invalid rate limit';
  end if;
  -- Limpieza acotada para no conservar identificadores de solicitudes vencidas.
  delete from public.dp_rate_limits where key_hash in (
    select key_hash from public.dp_rate_limits where expires_at < stamp - interval '1 hour' limit 100
  );
  insert into public.dp_rate_limits as limits (key_hash, attempts, expires_at)
    values (p_key, 1, stamp + p_duration_ms * interval '1 millisecond')
  on conflict (key_hash) do update set
    attempts = case when limits.expires_at <= stamp then 1 else least(limits.attempts + 1, 1000000) end,
    expires_at = case when limits.expires_at <= stamp then stamp + p_duration_ms * interval '1 millisecond' else limits.expires_at end
  returning attempts into hits;
  return hits <= p_max;
end;
$$;
revoke all on function public.dp_commit_state(text, bigint, jsonb) from public, anon, authenticated;
revoke all on function public.dp_take_rate(text, integer, integer) from public, anon, authenticated;
grant execute on function public.dp_commit_state(text, bigint, jsonb) to service_role;
grant execute on function public.dp_take_rate(text, integer, integer) to service_role;

-- Separación explícita: las pruebas nunca escriben las cuentas de producción.
insert into public.dp_state (id, value)
select id, '{"users":[],"sessions":[],"links":[],"invites":[],"pending":[],"tasks":[],"rooms":[],"issues":[]}'::jsonb
from (values ('production'), ('preview')) as spaces(id)
on conflict (id) do nothing;
commit;
