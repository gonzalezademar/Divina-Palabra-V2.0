import { educationalOrchestrator } from './educationalOrchestrator';
import { contentGovernanceEngine } from './contentGovernanceEngine';
import { BibleCatalog, Challenge } from '@/data/bibleData';

export type SemanticStatus = 'Excelente' | 'Bueno' | 'Mejorable' | 'Crítico';

export interface GraphNode {
  id: string;
  type: 'tema' | 'libro' | 'desafio' | 'doctrina' | 'bloom' | 'dificultad';
  label: string;
  connections: string[];
}

export interface SemanticReport {
  semanticCoverage: SemanticStatus;
  nodesCount: number;
  edgesCount: number;
  
  topConnectedNodes: string[];
  orphanNodes: string[];
  redundantNodes: string[];
  
  editorialRecommendations: string[];
}

export class KnowledgeGraphEngine {
  private static instance: KnowledgeGraphEngine;
  private graph: Map<string, GraphNode> = new Map();

  private constructor() {}

  static getInstance(): KnowledgeGraphEngine {
    if (!KnowledgeGraphEngine.instance) {
      KnowledgeGraphEngine.instance = new KnowledgeGraphEngine();
    }
    return KnowledgeGraphEngine.instance;
  }

  public buildSemanticGraph(catalog: BibleCatalog) {
    this.graph.clear();
    const allChallenges = [
      ...catalog.findWordLevel1, 
      ...catalog.findWordLevel2,
      ...catalog.completePhraseChallenges,
      ...catalog.guessPhraseChallenges
    ];

    allChallenges.forEach((c, idx) => {
      const p = c._pedagogy || educationalOrchestrator.analyzeChallenge(c);
      
      const chalId = `chal_${idx}`;
      this.addNode(chalId, 'desafio', c.reference || c.answer || `Desafío ${idx}`);
      
      const themeId = `thm_${p.theme}`;
      this.addNode(themeId, 'tema', p.theme);
      this.addEdge(chalId, themeId);

      const bookId = `bk_${p.book}`;
      this.addNode(bookId, 'libro', p.book);
      this.addEdge(chalId, bookId);
      
      const docId = `doc_${p.testament}`;
      this.addNode(docId, 'doctrina', p.testament);
      this.addEdge(chalId, docId);
      this.addEdge(themeId, docId);

      const bloomId = `blm_${p.bloomLevel}`;
      this.addNode(bloomId, 'bloom', p.bloomLevel);
      this.addEdge(chalId, bloomId);
      
      const diffId = `diff_${p.difficulty}`;
      this.addNode(diffId, 'dificultad', `Nivel ${p.difficulty}`);
      this.addEdge(chalId, diffId);
    });
  }

  private addNode(id: string, type: GraphNode['type'], label: string) {
    if (!this.graph.has(id)) {
      this.graph.set(id, { id, type, label, connections: [] });
    }
  }

  private addEdge(id1: string, id2: string) {
    const node1 = this.graph.get(id1);
    const node2 = this.graph.get(id2);
    if (node1 && node2) {
      if (!node1.connections.includes(id2)) node1.connections.push(id2);
      if (!node2.connections.includes(id1)) node2.connections.push(id1);
    }
  }

  public getSemanticReport(catalog: BibleCatalog): SemanticReport {
    this.buildSemanticGraph(catalog);
    const govAudit = contentGovernanceEngine.auditFullCatalog(catalog);

    const nodes = Array.from(this.graph.values());
    const nodesCount = nodes.length;
    let edgesCount = 0;
    
    let semanticCoverage: SemanticStatus = 'Excelente';
    if (govAudit.themeCoverage === 'Mejorable' || govAudit.themeCoverage === 'Crítico') {
      semanticCoverage = 'Mejorable';
    }

    const orphanNodes: string[] = [];
    const redundantNodes: string[] = [];
    
    const nodeDegrees = nodes.map(n => {
      edgesCount += n.connections.length;
      if (n.connections.length === 0) orphanNodes.push(n.label);
      return { id: n.id, label: n.label, deg: n.connections.length, type: n.type };
    });

    edgesCount = edgesCount / 2; // undirected graph

    nodeDegrees.sort((a, b) => b.deg - a.deg);
    const topConnectedNodes = nodeDegrees.filter(n => n.type !== 'desafio').slice(0, 5).map(n => n.label);

    const editorialRecommendations: string[] = [];
    if (orphanNodes.length > 0) {
      editorialRecommendations.push('Existen nodos aislados que requieren integración temática o bíblica.');
    } else {
      editorialRecommendations.push('El grafo está completamente interconectado.');
    }
    
    if (semanticCoverage !== 'Excelente') {
      editorialRecommendations.push('Ampliar la red semántica incorporando nuevos temas transversales.');
    }

    return {
      semanticCoverage,
      nodesCount,
      edgesCount,
      topConnectedNodes,
      orphanNodes,
      redundantNodes,
      editorialRecommendations
    };
  }
}

export const knowledgeGraphEngine = KnowledgeGraphEngine.getInstance();
