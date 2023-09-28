import ProjectPage from "../pages/ProjectPage";
import TaskPage from "../pages/TaskPage";

const routesConfig = [
    {
        path: '/project',
        element: <ProjectPage />
    },
    {
        path: '/task',
        element: <TaskPage />
    },
]
export default routesConfig;