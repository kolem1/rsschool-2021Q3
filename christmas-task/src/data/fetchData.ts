export async function fetchData<DataType>(url: string): Promise<DataType> {
  const response = await fetch(url);
  const data = (await response.json()) as Promise<DataType>;
  return data;
}
