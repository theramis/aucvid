type UtcTimeIso = string;

type DocumentMetaData = {
  createdAtUtcTimeIso: UtcTimeIso;
  updatedAtUtcTimeIso: UtcTimeIso;
};

export type DataDocument<Type> = {
  metaData: DocumentMetaData;
  data: Type;
};
