// Composables
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Login from "@/views/index.vue";
import Home from "@/views/dashboard/index.vue";
import ManuallyTumourSegmentation from "@/views/tumour-segmentation-manually/MainPage.vue";
import ManuallyTumourCalculation from "@/views/tumour-distance-calculation/MainPage.vue";
import ManuallyTumourCenter from "@/views/tumour-center-manually/MainPage.vue";
import ManuallyTumourAssisted from "@/views/tumour-assisted-manually/MainPage.vue";
import SegmentationLayout from "@/layouts/segmentation-layout/Default.vue";
import CalculationLayout from "@/layouts/calculation-layout/Default.vue";
import ClinicalReportViewer from "@/views/clinical-report-viewer/index.vue";
import Dashboard from "@/views/dashboard/study-dashboard/index.vue";
import TutorialDashboard from "@/views/dashboard/tutorial-dashboard/index.vue";
import CatalogueDashboard from "@/views/dashboard/catalogue-dashboard/index.vue";
import CatalogueDashboardView from "@/views/dashboard/catalogue-dashboard/catalogue-dashboard-view.vue";
import WorkflowToolsViewer from "@/views/dashboard/catalogue-dashboard/workflow-tools-viewer.vue";
import TumourPositionReporting from "@/views/tumour-position-reporting/MainPage.vue"

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard:dashboardType",
    name: "Dashboard",
    component: Dashboard,
    // props: (route:any) => ({ dashboardType: route.params.dashboardType })
  },
  {
    path: "/how-it-works",
    name: "TutorialDashboard",
    component:TutorialDashboard
  },
  {
    path: "/catalogue-dashboard",
    component:CatalogueDashboard,
    children:[
      {
        path: "/catalogue-dashboard",
        name: "CatalogueDashboardView",
        component: CatalogueDashboardView,
      },
      {
        path: "/catalogue-dashboard-workflow-tools",
        name: "WorkflowToolsViewer",
        component: WorkflowToolsViewer,
      }
    ]
  },
  {
    path: "/tumour-segmentation-manual",
    component: SegmentationLayout,
    children: [
      {
        path: "/tumour-segmentation-manual",
        name: "TumourSegmentationStudy",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: ManuallyTumourSegmentation,
      },
    ],
  },
  {
    path: "/tumour-calculation-manual",
    component: CalculationLayout,
    children: [
      {
        path: "/tumour-calculation-manual",
        name: "TumourCalaulationStudy",
        component: ManuallyTumourCalculation,
      },
    ],
  },
  {
    path: "/tumour-center-manual",
    component: CalculationLayout,
    children: [
      {
        path: "/tumour-center-manual",
        name: "TumourCenterStudy",
        component: ManuallyTumourCenter,
      },
    ],
  },
  {
    path: "/tumour-assisted-manual",
    component: CalculationLayout,
    children: [
      {
        path: "/tumour-assisted-manual",
        name: "TumourAssistedStudy",
        component: ManuallyTumourAssisted,
      },
    ],
  },
  {
    path: "/tumour-position-reporting",
    component: CalculationLayout,
    children: [
      {
        path: "/tumour-position-reporting",
        name: "TumourPositionReporting",
        component: TumourPositionReporting,
      },
    ],
  },
  {
    path: "/clinical-report-viewer",
    name: "ClinicalReportViewer",
    component: ClinicalReportViewer,
  }
];


// use for the github repo

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// export default router;

// const router = createRouter({
//   history: createWebHashHistory(),
//   linkActiveClass: "active",
//   routes,
// });
// export default router;

// console.log(process.env.BASE_URL);

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

export default router;
