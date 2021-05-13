# coding: utf-8

Gem::Specification.new do |spec|
  spec.name                    = "MLF"
  spec.version                 = "1.0.1"
  spec.summary                 = %q{na}
  spec.homepage                = "http://mlf.halcyonlane.com"
  spec.authors                 = "me"
  spec.licenses                = ["n/a"]

  spec.metadata["plugin_type"] = "theme"

  spec.files                   = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|_(includes|layouts|posts)/|((\.(txt|md|markdown)|$)))}i)
  end

  spec.add_runtime_dependency "jekyll", "~> 4.0"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.3"
  spec.add_runtime_dependency "jekyll-gist", "~> 1.5"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.12"
  spec.add_runtime_dependency "jekyll-data", "~> 1.1"
  spec.add_runtime_dependency "jemoji", "~> 0.11"

  spec.add_development_dependency "bundler", "~> 2.0"
  spec.add_development_dependency "rake", "~> 13.0"
  spec.add_development_dependency "html-proofer", "~> 3.15"
end
