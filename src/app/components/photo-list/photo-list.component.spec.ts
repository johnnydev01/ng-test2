import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { PhotoListModule } from './photo-list.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListComponent } from './photo-list.component';
import { buildPhotoList } from 'src/app/shared/components/photo-board/test/build-photo-list';
import { of } from 'rxjs';

describe(PhotoListComponent.name, () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let service: PhotoBoardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoListComponent ],
      imports: [
        HttpClientTestingModule,
        PhotoListModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PhotoBoardService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(D) should display board when data arrive`, () => {
    const photos = buildPhotoList();
    spyOn(service, 'getPhotos')
      .and.returnValue(of(photos));
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');
    expect(board).not.toBeNull();
    expect(loader).toBeNull();
    expect(board).withContext('should display board');
    expect(loader).withContext('should not display loader');

  });

  it(`(D) should display board  while winting for data`, () => {
    const photos = buildPhotoList();
    spyOn(service, 'getPhotos')
      .and.returnValue(null);
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');
    expect(board).toBeNull();
    expect(loader).not.toBeNull();
    expect(board).withContext('should not display board');
    expect(loader).withContext('should display loader');

  });
});
