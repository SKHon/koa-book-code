{
  'targets': [
    {
      'target_name': 'sum',
      'include_dirs': [
        "<!(node -e \"require('nan')\")"
      ],
      'sources': [
        'src/init.cc'
      ]
    }
  ]
}