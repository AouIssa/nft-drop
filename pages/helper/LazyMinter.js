const ethers = require('ethers')
const util = require('../constants');
const myContract = require('../../artifacts/contracts/LazyNFT.sol/LazyNFT.json');
const SIGNING_DOMAIN_NAME = "LazyNFT-Voucher"
const SIGNING_DOMAIN_VERSION = "1"

class LazyMinter {

    /**
     * Create a new LazyMinter targeting a deployed instance of the LazyNFT contract.
     * 
     * @param {Object} options
     * @param {ethers.Contract} contract an ethers Contract that's wired up to the deployed contract
     * @param {ethers.Signer} signer a Signer whose account is authorized to mint NFTs on the deployed contract
     */
    // constructor({ contract, signer }) {
    //     this.contract = contract
    //     this.signer = signer
    // }

    /**
     * Creates a new NFTVoucher object and signs it using this LazyMinter's signing key.
     * 
     * @param {ethers.BigNumber | number} tokenId the id of the un-minted NFT
     * @param {string} uri the metadata URI to associate with this NFT
     * @param {ethers.BigNumber | number} minPrice the minimum price (in wei) that the creator will accept to redeem this NFT. defaults to zero
     * 
     * @returns {Promise<NFTVoucher>}
     */
    async createVoucher(tokenId, uri, minPrice) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        minPrice = ethers.utils.parseUnits(minPrice,2);

        const voucher = { tokenId, uri, minPrice }
        const domain = await this._signingDomain()
        const types = {
            NFTVoucher: [
                { name: "tokenId", type: "uint256" },
                { name: "minPrice", type: "uint256" },
                { name: "uri", type: "string" },
            ]
        }
        const signature = await signer._signTypedData(domain, types, voucher);
        return {
            ...voucher,
            signature,
        }
    }



    async redeem(voucher) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const lazyNFT = new ethers.Contract(util.CONTRACT_ADDRESS, myContract.abi, signer);
        return lazyNFT.redeem(await signer.getAddress(), voucher);
    }

    /**
     * @private
     * @returns {object} the EIP-721 signing domain, tied to the chainId of the signer
     */
    async _signingDomain() {
        if (this._domain != null) {
            console.log("it s not null");
            return this._domain
        }

        this._domain = {
            name: SIGNING_DOMAIN_NAME,
            version: SIGNING_DOMAIN_VERSION,
            verifyingContract: util.CONTRACT_ADDRESS,
        }
        return this._domain
    }
}

export default
    LazyMinter
