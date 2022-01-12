import contract from "@truffle/contract";
export const loadContract = async (name, provider) => {
  const Artifact = await fetch(`/contracts/${name}.json`).then(
    async (res) => await res.json()
  );
  const _contract = contract(Artifact);
  _contract.setProvider(provider);

  const deployedContract = await _contract.deployed();
  
  return deployedContract;
};
