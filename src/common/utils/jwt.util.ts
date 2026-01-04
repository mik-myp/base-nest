export function getTokenExpirationSeconds(): number {
  // 这里可以根据环境变量或业务需求动态计算过期时间
  return 60 * 60 * 24;
}
