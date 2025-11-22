# Route53
resource "aws_route53_zone" "main" {
  name = var.domain_name

  tags = {
    Name = "${var.project_name}-zone"
  }
}

# Aレコード（ドメイン → Elastic IP）
resource "aws_route53_record" "main" {
  zone_id = aws_route53_zone.main.zone_id

  name    = var.domain_name
  type    = "A"
  ttl     = 300
  records = [aws_eip.main.public_ip]
}
