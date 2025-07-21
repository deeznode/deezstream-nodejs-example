import { DeezStreamClient, SubscribeTransactionsResponse } from '@deezstream/grpc-client';
import { program } from 'commander';
import bs58 from 'bs58';

async function main() {
    program
        .name('deezstream-simple-client')
        .description('A simple Node.js client for DeezStream, using @deezstream/grpc-client.')
        .version('1.0.0')
        .option('-e, --endpoint <string>', 'DeezStream gRPC endpoint', 'localhost:10002')
        .option('-k, --api-key <string>', 'API key for authenticated access')
        .option('-i, --include-account <accounts...>', 'Accounts to include in the stream')
        .option('-x, --exclude-account <accounts...>', 'Accounts to exclude from the stream')
        .parse(process.argv);

    const options = program.opts();
    const { apiKey, includeAccount, excludeAccount } = options;
    
    // Helper to strip protocol from URL, as gRPC clients expect just the host and port
    const stripProtocol = (url: string) => url.replace(/^(http|https):\/\//, '');
    const endpoint = stripProtocol(options.endpoint);

    if (!includeAccount && !excludeAccount) {
        console.error('Error: At least one of --include-account or --exclude-account must be provided.');
        program.help();
        process.exit(1);
    }

    console.log(`Connecting to DeezStream at ${endpoint}...`);

    const client = new DeezStreamClient({ endpoint, apiKey });

    client.on('transaction', (response: SubscribeTransactionsResponse) => {
        if (response.transaction?.transaction?.signatures?.length) {
            const signature = bs58.encode(response.transaction.transaction.signatures[0]);
            console.log(`Received transaction: ${signature}`);
        }
    });

    client.on('error', (err: any) => {
        console.error('Stream error:', err.message);
    });

    client.on('end', () => {
        console.log('Stream ended.');
    });

    console.log('Subscribing to transactions with filters:', {
        include: includeAccount || [],
        exclude: excludeAccount || []
    });
    
    client.subscribeTransactions({
        includeAccounts: includeAccount,
        excludeAccounts: excludeAccount,
    });
}

main().catch(err => {
    console.error('An unexpected error occurred:', err);
    process.exit(1);
});