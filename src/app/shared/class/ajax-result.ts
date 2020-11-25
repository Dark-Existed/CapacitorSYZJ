export class AjaxResult {
  constructor(
    public success: boolean,
    public result: any,
    public error?: { message: string; details: string; },
    public targetUrl?: string,
    public unAuthorizedRequest?: boolean) {}
}
