import http from "./http";
import { IDashboardCategory, IDashboardWorkflow, IAssayDetails, IAssayLaunch, IAssayDataset } from "@/models/apiTypes";

export async function useDashboardProgrammes() {
    const programmes = http.get<IDashboardCategory[]>("/dashboard/programmes");
    return programmes;
}

export async function useDashboardCategoryChildren(seek_id: string, category: string) {
    const details = http.get<IDashboardCategory[]>("/dashboard/category-children", { seek_id, category });
    return details;
}

export async function useDashboardWorkflows() {
    const workflows = http.get<IDashboardWorkflow[]>("/dashboard/workflows");
    return workflows;
}

export async function useDashboardWorkflowDetail(seek_id: string) {
    const details = http.get<IDashboardWorkflow>("/dashboard/workflow-detail", { seek_id });
    return details;
}

export async function useSaveAssayDetails(body: IAssayDetails) {
    const success = http.post<boolean>("/dashboard/assay-details", body);
    return success;
  }

export async function useDashboardGetAssayDetails(seek_id: string) {
    const details = http.get<IAssayDetails>("/dashboard/assay-details", { seek_id });
    return details;
}
export async function useDashboardGetAssayLaunch(seek_id: string) {
    const details = http.get<IAssayLaunch>("/dashboard/assay-launch", { seek_id });
    return details;
}
export async function useDashboardGetDatasets(category: string) {
    const details = http.get<IAssayDataset[]>("/dashboard/datasets", { category });
    return details;
}
export async function useDashboardSelectedDatasetSampleTypes(uuid: string) {
    const sampleTypes = http.get<string[]>("/dashboard/dataset-detail", { uuid });
    return sampleTypes;
}
