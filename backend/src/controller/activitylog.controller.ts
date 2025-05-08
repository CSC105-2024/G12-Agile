import { getUserActivities, getAllActivities } from "../model/activitylog.model.ts";

const getActivityLog = async (c: any) => {
  const user = c.get("user");
  const logs = await getUserActivities(user.id);
  return c.json(logs);
};

const getAllActivityLog = async (c: any) => {
  const logs = await getAllActivities();
  return c.json(logs);
};

export { getActivityLog, getAllActivityLog };
