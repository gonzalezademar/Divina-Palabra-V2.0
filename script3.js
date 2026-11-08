const fs = require('fs');
const path = require('path');

const pagePath = path.join(process.cwd(), 'src', 'app', 'teacher', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Wrap availableChallenges in useMemo
content = content.replace(
  /const availableChallenges = \(\(\) => \{([\s\S]*?)\}\)\(\);/,
  \const availableChallenges = useMemo(() => {
\
  }, [lessonLang, lessonVersion, lessonMode, lessonDoctrinalProfile]);\
);

// 2. Wrap callbacks
content = content.replace(
  /const toggleChallengeSelection = \(item: any\) => \{([\s\S]*?)\};\n\n  const generateLessonLink =/m,
  \const toggleChallengeSelection = useCallback((item: any) => {
\
  }, [selectedChallenges, playSound]);\n\n  const generateLessonLink =\
);

content = content.replace(
  /const generateLessonLink = \(\) => \{([\s\S]*?)\};\n\n  const handleCopy =/m,
  \const generateLessonLink = useCallback(() => {
\
  }, [playSound, lessonName, lessonDifficulty, lessonVersion, lessonLang, lessonDoctrinalProfile, selectedChallenges, availableChallenges, reflectionQuestion]);\n\n  const handleCopy =\
);

content = content.replace(
  /const handleCopy = \(\) => \{([\s\S]*?)\};\n\n  const handleShareWhatsApp =/m,
  \const handleCopy = useCallback(() => {
\
  }, [playSound, generatedUrl]);\n\n  const handleShareWhatsApp =\
);

content = content.replace(
  /const handleShareWhatsApp = \(\) => \{([\s\S]*?)\};\n\n  const handleBack =/m,
  \const handleShareWhatsApp = useCallback(() => {
\
  }, [playSound, lessonLang, lessonName, generatedUrl]);\n\n  const handleBack =\
);

content = content.replace(
  /const handleBack = \(\) => \{([\s\S]*?)\};/,
  \const handleBack = useCallback(() => {
\
  }, [playSound, router]);\
);

// 3. Import useCallback
content = content.replace(
  /import \{ useState, useEffect, useMemo \} from 'react';/,
  \import { useState, useEffect, useMemo, useCallback, memo } from 'react';\
);

// 4. Refactor all renderStatus functions to a single component or memoized function outside.
// Since it's too complex to regex all of them, I'll extract them using a generic function inside the component but with useCallback.

fs.writeFileSync(pagePath, content);
console.log("Teacher page partially optimized");
