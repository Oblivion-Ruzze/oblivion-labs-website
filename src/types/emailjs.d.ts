declare module '@emailjs/browser' {
  export function send(
    serviceId: string,
    templateId: string,
    templateParams: Record<string, any>,
    publicKey: string
  ): Promise<any>
  
  export function init(publicKey: string): void
}