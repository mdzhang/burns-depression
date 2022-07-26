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

// DNS records for Vercel
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

// DNS records for Google Search Console
// registered under zhang.michelle.d@gmail.com
resource "aws_route53_record" "site_txt_google" {
  name    = var.domain
  zone_id = aws_route53_zone.primary.zone_id
  type    = "TXT"
  records = ["google-site-verification=xX7miFcErsINdqDnjMkOcQRdQJR5AZQs1qwsjTnHx48"]
  ttl     = 300
}
