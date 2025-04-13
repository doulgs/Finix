export interface CreateDocumentDTO {
  transactionId: string;
  fileName: string;
  fileType?: string;
  fileBase64: string;
  description?: string;
  webSyncId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateDocumentDTO {
  transactionId?: string;
  fileName?: string;
  fileType?: string;
  fileBase64?: string;
  description?: string;
  webSyncId?: string;
  createdAt?: string;
  updatedAt?: string;
}
