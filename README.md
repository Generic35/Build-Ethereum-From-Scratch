# BuildEthereumFromScratch
Building Ethereum from scratch, using plain Javascript

Including:
- Programing language clone of solidity
- Blockchain
- Network of mining nodes
- Transactions and Accounts
- State Management

Ways to extend this project:
- Add gas price to the current features of gas limit and gasUsed
- Add fees to transaction 
- Add the ability for the miner to have control over the transaction series (prioritize based on gas price)
- Add tiny reward for ommers (blocks that were invalid but for which the miner still spent effort on)
- Replace the Trie with Patricia Trie
- Integrate a directed acyclic graph to the current mining algorithm
- Validate there are no duplicate transactions a block, and that the transactions don't already exist in the blockchain
- Transaction receipts, logsBloom, handle the and more smart contract instructions
