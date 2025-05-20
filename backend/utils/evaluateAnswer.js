// Compute Levenshtein Distance
function levenshteinDistance(a, b) {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Calculate similarity and confidence
function similarityAndConfidence(userAnswer, correctAnswer) {
  const distance = levenshteinDistance(userAnswer, correctAnswer);
  const maxLength = Math.max(userAnswer.length, correctAnswer.length);

  const similarity = maxLength === 0 ? 1.0 : 1 - distance / maxLength;

  // Confidence calculation (basic heuristic)
  let confidence = similarity;

  // Penalize very short answers (to avoid "a" being 100% match with "a")
  if (userAnswer.length < 5 && similarity > 0.8) {
    confidence *= 0.7;
  }

  // Slight boost for long and nearly perfect answers
  if (userAnswer.length > 10 && similarity > 0.9) {
    confidence += 0.05;
  }

  // Clamp between 0 and 1
  confidence = Math.max(0, Math.min(1, confidence));

  return {
    similarity: Number(similarity.toFixed(3)),
    confidence: Number(confidence.toFixed(3))
  };
}

export { similarityAndConfidence };
