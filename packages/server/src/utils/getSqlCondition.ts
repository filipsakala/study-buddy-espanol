const getSqlCondition = (learn_group?: string | string[]) => {
  const whereConditions = [];
  const whereParams = [];

  if (learn_group !== undefined) {
    whereConditions.push(`learn_group in ($2:csv)`);
    whereParams.push(learn_group);
  }
  return {
    whereConditions: whereConditions.join(" AND ") || "TRUE",
    whereParams,
  };
};

export default getSqlCondition;
