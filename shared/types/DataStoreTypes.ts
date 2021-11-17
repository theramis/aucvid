type UtcTimeIso = string;

export type DocumentMetadata = {
  createdAtUtcTimeIso: UtcTimeIso;
  updatedAtUtcTimeIso: UtcTimeIso;
};

export type DataDocument<Type> = {
  metadata: DocumentMetadata;
  data: Type;
};
