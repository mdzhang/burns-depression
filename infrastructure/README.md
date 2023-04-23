# Infrastructure

This app is deployed to <https://amisad.com/take-quiz>.

The domain is purchased through Amazon's AWS Route53. [Terraform](https://www.terraform.io/) is used to manage AWS resources (mostly DNS setup). [Terraform Cloud](https://cloud.hashicorp.com/products/terraform) is used to manage state but `terraform apply` is expected to be run locally.

<https://amisad.com/take-quiz> is setup to point to a site deployed using [Vercel](https://vercel.com/), on the [`burns-depression`](https://vercel.com/mdzhang/burns-depression) project.

The Vercel [Github](https://vercel.com/docs/concepts/git/vercel-for-github) integration is used to update <https://amisad.com> each time the `main` branch is updated.

Additional [backend](../backend/README.md) resource setup is done via Supabase.

## Setup

* Enter terraform subdirectory: `cd terraform`
* Install [`asdf`](https://asdf-vm.com/)
* Install `terraform`
  ```sh
  brew install asdf
  asdf plugin-add terraform
  asdf install
  ```
* Login from CLI
  ```sh
  terraform login
  ```
* Proceed with planning:
  ```sh
  terraform init
  terraform plan
  terraform apply
  ```

## Tips

Add to shell startup

```sh
alias tf='terraform'
```
