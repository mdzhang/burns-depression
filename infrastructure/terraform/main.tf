terraform {
  required_version = "1.2.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.22"
    }
  }

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "mdzhang"

    workspaces {
      name = "burns-depression"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_route53_zone" "primary" {
  name = var.domain
}

resource "aws_route53_record" "site_a" {
  name    = var.domain
  zone_id = aws_route53_zone.primary.zone_id
  type    = "A"
  records = ["76.76.21.21"]
  ttl     = 300
}

resource "aws_route53_record" "site_cname" {
  name    = "www"
  zone_id = aws_route53_zone.primary.zone_id
  type    = "CNAME"
  records = ["cname.vercel-dns.com"]
  ttl     = "5"
}
