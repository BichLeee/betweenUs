import { api } from "./apiConfig";

export const createSpace = async (name: string) => {
    return api.post("/space", { name });
};

export const getSpaces = async () => {
    return api.get(`/space/get`);
};

export const joinSpace = async (inviteCode: string) => {
    return api.post(`/space/join/${inviteCode}`);
};

export const getSpaceDetail = async (spaceId: string) => {
    return api.get(`/space/${spaceId}`);
};

export const createLine = async (spaceId: string, afterLineId?: string | null) => {
    return api.post(`/space/${spaceId}/create-line`, { afterLineId });
};
