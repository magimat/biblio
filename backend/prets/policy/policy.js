{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": [
          "dynamodb:DeleteItem",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:Scan",
          "dynamodb:UpdateItem",
          "dynamodb:Query"
        ],
        "Effect": "Allow",
        "Resource": "*"
      }
    ]
  }