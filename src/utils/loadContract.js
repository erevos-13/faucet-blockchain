import contract from "@truffle/contract";
export const loadContract = async (name, provider) => {
  const Artifact = await fetch(`/contracts/${name}.json`).then(
    async (res) => await res.json()
  );
  const _contract = contract(Artifact);
  _contract.setProvider(provider);
  let deployedContract = null;
  try {
    deployedContract = await _contract.deployed();
  } catch (error) {
    console.error("Can not load contract", { error });
  }

  return deployedContract;
};
