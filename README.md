# Trabalho de Conclusão de Disciplina - Integração Contínua para Automação de Testes

## 🎯 Objetivo do Projeto
O objetivo deste projeto é desenvolver e consolidar uma pipeline de **Integração Contínua (CI)** utilizando o **GitHub Actions** para uma aplicação Node.js dotada de testes automatizados. O foco prático reside na automação do ciclo de feedback de testes, geração de relatórios visuais e gerenciamento de artefatos de build.

A aplicação consiste em uma classe `ServicoDePagamento` que valida regras de negócio associadas a códigos de barra, empresas credoras, valores e categorização automática de transações (classificando pagamentos com valor acima de 100 como "cara" e os demais como "padrão").

---

## 🧠 Conceitos de Integração Contínua (CI) Aplicados

### O que é Integração Contínua?
A Integração Contínua é uma prática de desenvolvimento de software de cultura DevOps, na qual os desenvolvedores frequentemente combinam suas alterações de código em um repositório central. Cada integração dispara uma automação de build e uma suíte de testes automatizados. Os principais benefícios são a detecção precoce de bugs, melhoria da qualidade do código e redução do tempo de lançamento (*Time-to-Market*).

### Gatilhos de Execução da Pipeline (Triggers)
Em conformidade com os requisitos da disciplina, a pipeline configurada em `.github/workflows/ci.yml` responde a três gatilhos distintos:
1. **Execução por Push:** Disparada automaticamente sempre que novas alterações são enviadas para a ramificação principal `main`, mitigando erros de integração no código compartilhado.
2. **Execução Manual (Workflow Dispatch):** Permite que qualquer membro da equipe acione a pipeline sob demanda através da interface web do GitHub Actions, facilitando testes de infraestrutura ou validações pontuais.
3. **Execução Agendada (Schedule/Cron):** Configurada para rodar de forma assíncrona e recorrente (toda segunda-feira às 08:00 UTC) utilizando expressões cron. Garante a saúde contínua do projeto mesmo sem interações diretas no código (verificando depreciação de dependências externas, por exemplo).

---

## 📊 Relatórios de Testes e Artefatos (Artifacts)

### Geração e Publicação do Relatório
A suíte de testes automatizados foi construída com o framework **Mocha** e asserções nativas do Node.js (`assert`). Para a camada de relatórios, integrou-se a biblioteca **Mochawesome**.

Ao fim da execução dos testes na esteira de CI, a ferramenta gera dinamicamente um relatório visual interativo em formato **HTML**.

### Armazenamento na Pipeline
Utilizando a action oficial `actions/upload-artifact@v4`, a pipeline faz o upload persistente da pasta contendo o relatório HTML gerado. Esse arquivo fica disponível para download diretamente na página de sumário da execução da respectiva Action sob o nome `relatorio-de-testes-html`. A condicional `if: always()` foi empregada para garantir que o relatório seja gerado e anexado mesmo se algum teste falhar.

---

## 🛠️ Instruções de Execução Local

### Pré-requisitos
* Node.js (Versão 18 ou superior)
* Gerenciador de pacotes NPM

### Instalação de Dependências
```bash
npm install
