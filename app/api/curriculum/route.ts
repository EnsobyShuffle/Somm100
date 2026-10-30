import { curriculum } from '../../../lib/learning';
import network from '../../../data/knowledge-network.json';
import editorial from '../../../data/core-editorial.json';
import media from '../../../data/media-provenance.json';
import videos from '../../../data/video-library.json';
import learningStages from '../../../data/learning-stages.json';
import platform from '../../../data/platform.json';
import wineMaps from '../../../data/wine-maps.json';
import news from '../../../data/news-sources.json';
import english from '../../../data/english-study.json';
export function GET(){return Response.json({schemaVersion:2,...curriculum,network,editorial,media,videos,learningStages,platform,wineMaps,news,english},{headers:{'Cache-Control':'private, max-age=300'}})}
