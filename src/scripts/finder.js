// Sums "id:points" answers and returns the beer id with the most points.
// Ties go to the beer listed first in `order`, so the result is always the same for the same answers.
export function pickBeer(answers, order) {
  const totals = Object.fromEntries(order.map((id) => [id, 0]));
  for (const answer of answers) {
    for (const part of answer.split(',')) {
      const [id, pts] = part.split(':');
      if (id in totals) totals[id] += Number(pts);
    }
  }
  return order.reduce((best, id) => (totals[id] > totals[best] ? id : best), order[0]);
}
