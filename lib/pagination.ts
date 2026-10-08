export function paginate<T>(items:T[], requestedPage?:string, pageSize=6) {
  const totalPages=Math.max(1,Math.ceil(items.length/pageSize));
  const parsed=Number(requestedPage);
  const page=Number.isSafeInteger(parsed)&&parsed>0?Math.min(parsed,totalPages):1;
  const start=(page-1)*pageSize;
  return {page,totalPages,items:items.slice(start,start+pageSize),start};
}
