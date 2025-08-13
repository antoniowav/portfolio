declare module 'resend' {
  export interface ResendEmailResponse {
    id?: string;
    from: string;
    to: string[];
    created_at?: string;
    error?: ResendError;
  }

  export interface ResendError {
    statusCode: number;
    name: string;
    message: string;
  }

  export interface SendEmailOptions {
    from: string;
    to: string[];
    subject: string;
    html?: string;
    text?: string;
    cc?: string[];
    bcc?: string[];
    reply_to?: string;
    headers?: Record<string, string>;
    attachments?: Array<{
      filename: string;
      content: Buffer | string;
      contentType?: string;
    }>;
    tags?: Array<{
      name: string;
      value: string;
    }>;
  }

  export class Resend {
    constructor(apiKey: string);

    emails: {
      send: (options: SendEmailOptions) => Promise<{
        data: ResendEmailResponse | null;
        error: ResendError | null;
      }>;
    };
  }
}
