# DeezStream Node.js Example

DeezStream is a high-performance streaming service for receiving real-time transaction data from the Solana blockchain. This service streams data directly to your application, minimizing delays and eliminating the need for polling.

## Getting Started

Follow these instructions to set up and run the client on your local machine.

### Prerequisites

Before you begin, make sure you have the following installed:

- [Git](https://git-scm.com/) for cloning the repository
- [Node.js](https://nodejs.org/) (v18 or newer recommended)

### Usage

1.  **Clone the repository**
    ```bash
    git clone https://github.com/deeznode/deezstream-nodejs-example.git
    cd deezstream-nodejs-example
    ```

2.  **Install dependencies**

    This will install the client dependencies, including the core `@deezstream/grpc-client` library.
    ```bash
    npm install
    ```

3.  **Run the client**

    Use the `npm start` command to run the client. You must provide the service endpoint and at least one account filter via command-line arguments.

    **Command format:**
    ```bash
    npm start -- --endpoint <your-endpoint> --include-account <account-to-include...>
    ```

    **Example:**
    ```bash
    npm start -- --endpoint http://xxx.deezstream.org:1234 --include-account '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'
    ```

    You can also specify accounts to exclude:
    ```bash
    npm start -- --endpoint http://xxx.deezstream.org:1234 --include-account 'YourIncludeAccount' --exclude-account 'YourExcludeAccount'
    ``` 