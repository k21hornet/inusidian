# inusidian用ECRリポジトリ（api, web, databaseの3つのイメージを格納）
resource "aws_ecr_repository" "main" {
  name                 = var.project_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "AES256"
  }

  tags = {
    Name = "${var.project_name}-ecr"
  }
}

# ライフサイクルポリシー（古いイメージの自動削除）
resource "aws_ecr_lifecycle_policy" "main" {
  repository = aws_ecr_repository.main.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 9 images per tag"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 9 # api, web, database それぞれ3イメージずつ
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}
