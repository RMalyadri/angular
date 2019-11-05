
export interface IEmpInfo {
    firstName: string;
    lastName: string;
    gender: string;
    eid:string;
}

export const genders = [{ dis: 'Male', value: 'M' }, { dis: 'Female', value: 'F' }];

export const AppConstants = {
   APP_URL: 'http://localhost:8001/SpringBootAng',
   PAGINATION_ROW_SIZE:10,
   PAGINATION_INDEX_SIZE:5,
}

export interface IResponseInfo {
    status: string;
    message?: string;
}