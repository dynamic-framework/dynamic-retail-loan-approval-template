import type { ApiAccount, ApiResponseWrapped } from '../api-interface';
import ApiClient from '../clients/apiClient';
import accountMapper from '../mappers/accountMapper';

import { RepositoryParams } from './repository';

export async function list(params: RepositoryParams) {
  const { data } = await ApiClient.request<ApiResponseWrapped<ApiAccount[]>>({
    url: 'accounts/DEPOSIT',
    method: 'GET',
    signal: params.config?.abortSignal,
  });
  return data.content.map(accountMapper);
}
