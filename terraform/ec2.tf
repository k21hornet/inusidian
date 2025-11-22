# セキュリティグループ
resource "aws_security_group" "web" {
  name        = "${var.project_name}-web-sg"
  description = "Security group for web server"
  vpc_id      = aws_vpc.main.id

  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # SSH（管理用）
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.allowed_ssh_cidr
  }

  # アウトバウンド（全許可）
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-web-sg"
  }
}

# Elastic IP
resource "aws_eip" "main" {
  domain = "vpc"

  tags = {
    Name = "${var.project_name}-eip"
  }
}

# EC2インスタンス
resource "aws_instance" "main" {
  ami           = var.ec2_ami_id
  instance_type = var.ec2_instance_type
  subnet_id     = aws_subnet.public.id
  key_name      = var.ec2_key_name

  vpc_security_group_ids = [aws_security_group.web.id]

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y docker
              systemctl start docker
              systemctl enable docker
              curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose
              
              # nginxのインストールと起動
              yum install -y nginx
              systemctl start nginx
              systemctl enable nginx
              
              # テスト用のnginx設定（後でカスタマイズ可能）
              cat > /etc/nginx/conf.d/default.conf <<'NGINX_EOF'
              server {
                  listen 80;
                  server_name _;
                  
                  location / {
                      return 200 "Hello from nginx on EC2!";
                      add_header Content-Type text/plain;
                  }
              }
              NGINX_EOF
              
              systemctl reload nginx

              # certbotのインストール
              yum install -y certbot python3-certbot-nginx
              EOF

  tags = {
    Name = "${var.project_name}-ec2"
  }
}

# Elastic IPとEC2インスタンスの関連付け
resource "aws_eip_association" "main" {
  instance_id   = aws_instance.main.id
  allocation_id = aws_eip.main.id
}
