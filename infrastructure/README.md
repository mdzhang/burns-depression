# Infrastructure

This app is deployed to <amisad.com>.

Deployment is done using [Vercel](https://vercel.com/), on the [`burns-depression`](https://vercel.com/mdzhang/burns-depression) project.

The Vercel [Github](https://vercel.com/docs/concepts/git/vercel-for-github) integration is used to update <amisad.com> each time the `main` branch is updated.

The domain is purchased through Amazon's AWS Route53.

[Terraform](https://www.terraform.io/) is used to manage AWS resources. [Terraform Cloud](https://cloud.hashicorp.com/products/terraform) is used to manage state but `terraform apply` is expected to be run locally.

## Setup

* Install [`asdf`](https://asdf-vm.com/)
* Install `terraform`
  ```sh
  brew install asdf
  asdf plugin-add terraform
  asdf plugin-add terraform-docs
  asdf plugin-add tflint
  asdf install
  ```
* Login from CLI
  ```sh
  terraform login
  ```
* Proceed with planning:
  ```sh
  terraform init
  terraform plan # triggers run in TF cloud
  ```
* Push changes up and create a pull request to have Terraform Cloud automatically trigger a run
* Applies can only occur through TF cloud when manually triggered after a successful plan on a run triggered by a commit to the `main` branch

## Tips

Add to shell startup

```sh
alias tf='terraform'
```
