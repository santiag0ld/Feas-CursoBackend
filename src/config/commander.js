import { Command } from 'commander';

const program = new Command();

program 
    .option('--mode <mode>', 'modo de manejo de entornos', 'production')
    .parse();

export { program };
