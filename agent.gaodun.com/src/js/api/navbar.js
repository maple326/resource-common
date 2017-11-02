import { post } from '../util/agentAxios';

export const userLogout = parameters => post('/api/open', parameters);