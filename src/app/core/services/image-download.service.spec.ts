import { TestBed } from '@angular/core/testing';

import { ImageDownloadService } from './image-download.service';

describe('ImageDownloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageDownloadService = TestBed.get(ImageDownloadService);
    expect(service).toBeTruthy();
  });
});
