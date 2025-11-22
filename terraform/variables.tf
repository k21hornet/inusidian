variable "aws_region" {
  description = "AWSリージョン"
  type        = string
}

variable "project_name" {
  description = "プロジェクト名（リソース名のプレフィックスとして使用）"
  type        = string
  default     = "inusidian"
}

variable "vpc_cidr" {
  description = "VPCのCIDRブロック"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "パブリックサブネットのCIDRブロック"
  type        = string
  default     = "10.0.1.0/24"
}

variable "ec2_ami_id" {
  description = "EC2インスタンスのAMI ID"
  type        = string
}

variable "ec2_instance_type" {
  description = "EC2インスタンスタイプ"
  type        = string
}

variable "ec2_key_name" {
  description = "EC2インスタンスのキーペア名"
  type        = string
}

variable "domain_name" {
  description = "Route53で管理するドメイン名"
  type        = string
}

variable "allowed_ssh_cidr" {
  description = "SSHアクセスを許可するCIDRブロック"
  type        = list(string)
}
