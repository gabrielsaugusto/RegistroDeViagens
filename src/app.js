// Função para buscar todas as viagens
async function buscarViagens() {
  const response = await fetch('http://localhost:3000/api/viagens');
  const responseData = await response.json();
  const viagens = responseData.data || [];
  const viagensContainer = document.getElementById('viagens');
  viagensContainer.innerHTML = '';

  viagens.forEach((entry) => {
    const entryElement = document.createElement('tr');
    entryElement.className = 'text-left';
    entryElement.innerHTML = `
        <td class="py-2 px-4 border-b">${entry.destino}</td>
        <td class="py-2 px-4 border-b">${entry.descricao}</td>
        <td class="py-2 px-4 border-b">${entry.data}</td>
        <td class="py-2 px-4 border-b">${entry.avaliacao}</td>
        <td class="py-2 px-4 border-b">
          <button onclick="editarViagem(${entry.id})" class="text-blue-500">Editar</button>
          <button onclick="deletarViagem(${entry.id})" class="text-red-500 ml-4">Excluir</button>
        </td>
      `;
    viagensContainer.appendChild(entryElement);
  });
}

// Função para adicionar nova viagem
document.getElementById('formulario').addEventListener('submit', async (event) => {
  event.preventDefault();
  const destino = document.getElementById('destino').value;
  const descricao = document.getElementById('descricao').value;
  const data = document.getElementById('data').value;
  const avaliacao = document.getElementById('avaliacao').value;

  await fetch('http://localhost:3000/api/viagens', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ destino, descricao, data, avaliacao }),
  });

  buscarViagens();
  event.target.reset();
});

// Função para excluir uma viagem
async function deletarViagem(id) {
  const confirmation = confirm('Tem certeza que deseja excluir esta viagem?');
  if (confirmation) {
    await fetch(`http://localhost:3000/api/viagens/${id}`, {
      method: 'DELETE',
    });
    buscarViagens();
  }
}

// Função para editar descrição de uma viagem
async function editarViagem(id) {
  const newdescricao = prompt('Digite a nova descrição:');

  if (newdescricao) {
    const updatadEntry = {
      descricao: newdescricao,
    };

    await fetch(`http://localhost:3000/api/viagens/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatadEntry),
    });

    buscarViagens();
  }
}

// Carregar as viagens assim que a página for carregada
buscarViagens();
