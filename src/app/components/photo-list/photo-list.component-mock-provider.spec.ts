import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { PhotoListModule } from './photo-list.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListComponent } from './photo-list.component';
import { buildPhotoList } from 'src/app/shared/components/photo-board/test/build-photo-list';
import { Observable, of } from 'rxjs';
import { Photo } from 'src/app/shared/components/photo-board/interfaces/photo';
import { PhotoBoardMockService } from 'src/app/shared/components/photo-board/services/photo-board-mock.service';

describe(PhotoListComponent.name + 'Mock Provider', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoListComponent ],
      imports: [
        HttpClientTestingModule,
        PhotoListModule
      ],
      providers: [{
        provide: PhotoBoardService,
        useClass: PhotoBoardMockService
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(D) should display board when data arrive`, () => {
    const photos = buildPhotoList();
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');
    expect(board).not.toBeNull();
    expect(loader).toBeNull();
    expect(board).withContext('should display board');
    expect(loader).withContext('should not display loader');

  });


});
