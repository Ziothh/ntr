use clap::Parser;

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
pub struct CLI {
    // #[arg(short, long, default_value_t = String::from("./dist/routes.ts"))]
    // pub out_file: String,
    #[arg(short, long, default_value_t = String::from("./"))]
    pub project_path: String,
}
