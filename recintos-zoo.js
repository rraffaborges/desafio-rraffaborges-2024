class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ tipo: 'macaco', quantidade: 3, tamanho: 1 }] },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ tipo: 'gazela', quantidade: 1, tamanho: 2 }] },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ tipo: 'leao', quantidade: 1, tamanho: 3 }] }
      ];
  
      this.animaisInfo = {
        leao: { tamanho: 3, biomas: ['savana'] },
        leopardo: { tamanho: 2, biomas: ['savana'] },
        crocodilo: { tamanho: 3, biomas: ['rio'] },
        macaco: { tamanho: 1, biomas: ['savana', 'floresta'] },
        gazela: { tamanho: 2, biomas: ['savana'] },
        hipopotamo: { tamanho: 4, biomas: ['savana', 'rio'] }
      };
    }
  
    analisaRecintos(tipoAnimal, quantidade) {
      if (!this.animaisInfo[tipoAnimal]) {
        return "Animal inválido";
      }
  
      if (quantidade <= 0 || isNaN(quantidade)) {
        return "Quantidade inválida";
      }
  
      const animalInfo = this.animaisInfo[tipoAnimal];
      let recintosViaveis = [];
  
      for (const recinto of this.recintos) {
        const biomaOk = animalInfo.biomas.includes(recinto.bioma) || (recinto.bioma === 'savana e rio' && tipoAnimal === 'hipopotamo');
        
        if (!biomaOk) continue;

        const espacoNecessario = (quantidade * animalInfo.tamanho);
        const espacoExtra = recinto.animais.length > 0 ? 1 : 0;

        let espacoOcupado = 0;
        let isCarnivoro = tipoAnimal === 'leao' || tipoAnimal === 'leopardo';
  
        let conflitoCarnivoro = false;
        for (let animal of recinto.animais) {
          espacoOcupado += animal.quantidade * animal.tamanho;

          if (isCarnivoro && animal.tipo !== tipoAnimal) {
            conflitoCarnivoro = true;
            break;
          }
        }
  
        if (conflitoCarnivoro) continue;

        const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado - espacoExtra;
        if (espacoDisponivel >= espacoNecessario) {
          recintosViaveis.push(`Recinto nro ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario} total: ${recinto.tamanhoTotal})`);
        }
      }
  
      if (recintosViaveis.length > 0) {
        return recintosViaveis;
      } else {
        return "Não há recinto viável";
      }
    }
  }
  
  export { RecintosZoo as RecintosZoo };