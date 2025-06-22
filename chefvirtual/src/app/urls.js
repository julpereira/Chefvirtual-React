let valorURL;

if (typeof window !== 'undefined') {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  valorURL = isLocalhost
    ? 'http://localhost:9000'
    : 'https://chefvirtual.dev.vilhena.ifro.edu.br/api';
} else {
  valorURL = 'https://chefvirtual.dev.vilhena.ifro.edu.br/api'; // fallback no SSR
}

export default valorURL;
