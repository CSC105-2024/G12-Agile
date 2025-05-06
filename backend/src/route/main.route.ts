import { Hono } from 'hono';
import userRoute from './user.route.ts';
import projectRoute from './project.route.ts';

const mainRouter = new Hono();
mainRouter.route('/users', userRoute);
mainRouter.route("/projects", projectRoute);
export default mainRouter;
