const getSqlCondition = (learn_group?: string | string[], course?: string) => {
  const whereConditions = [];
  const whereParams = [learn_group, course];

  if (learn_group !== undefined) {
    whereConditions.push(`learn_group in ($2:csv)`);
  }
  if (course !== undefined) {
    whereConditions.push(`course in ($3:csv)`);
  }
  return {
    whereConditions: whereConditions.join(" AND ") || "TRUE",
    whereParams,
  };
};

export default getSqlCondition;
