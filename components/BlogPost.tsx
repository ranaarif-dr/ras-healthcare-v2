"use client"
import { useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Clock, Share2 } from 'lucide-react'

interface BlogPostProps {
  title: string
  slug: string
  content: string
  coverImage: string
  author: {
    name: string
    image: string
  }
 $createdAt: string
}

export default function BlogPost({
  title,
  content,
  coverImage,
  $createdAt,
}: BlogPostProps) {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const router = useRouter()
  const canonicalUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      <Head>
        <title>{title} | Healthcare Blog</title>
        <meta name="description" content={content.substring(0, 160)} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content.substring(0, 160)} />
        <meta property="og:image" content={coverImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-video">
              <Image
                src={coverImage}
                alt={title}
                layout="fill"
                objectFit="cover"
                priority
                onLoadingComplete={() => setIsImageLoading(false)}
              />
              {isImageLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">{title}</h1>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={"/ras-logo.png"} alt={"Ras Healthcare"} />
                  <AvatarFallback>{"Ras Healthcare".charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{"Ras Healthcare"}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{$createdAt}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>5 min read</span>
                  </div>
                </div>
              </div>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
              <div className="flex justify-between items-center pt-6 border-t">
                <Button variant="outline" onClick={() => router.back()}>
                  ← Back to Blog
                </Button>
                <Button variant="outline" onClick={() => navigator.share({ title, url: canonicalUrl })}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": title,
          "image": coverImage,
          "author": {
            "@type": "Person",
            "name": "Ras Healthcare"
          },
          "datePublished": $createdAt,
          "dateModified": $createdAt,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
          }
        })
      }} />
    </>
  )
}
