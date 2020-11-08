export class AjaxResult {
  constructor(
    private success: boolean,
    private result: any,
    private error?: { message: string; details: string; },
    private targetUrl?: string,
    private unAuthorizedRequest?: boolean) {}
}
