const valorUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9000'
  : 'https://chefvirtual.dev.vilhena.ifro.edu.br/api';
console.log(valorUrl)
export default valorUrl;